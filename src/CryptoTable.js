import React, { useEffect, useState } from 'react';
import {
	Container,
	TableCell,
	LinearProgress,
	Typography,
	TextField,
	TableBody,
	TableRow,
	TableHead,
	TableContainer,
	Table,
	Paper,
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function CryptoTable() {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');

	const history = useHistory();
	const symbol = '$';
	const currency = 'USD';

	const fetchCoins = async () => {
		setLoading(true);
		const { data } = await axios.get(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
		);
		console.log(data);

		setCoins(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchCoins();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency]);

	const handleSearch = () => {
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
		);
	};

	return (
		<Container style={{ textAlign: 'center' }}>
			<Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
				Cryptocurrency Prices
			</Typography>
			<TextField
				label="Search"
				variant="outlined"
				style={{ marginBottom: 20, width: '100%' }}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<TableContainer component={Paper}>
				{loading ? (
					<LinearProgress style={{ backgroundColor: '#4cd137' }} />
				) : (
					<Table aria-label="simple table">
						<TableHead style={{ backgroundColor: '#4cd137' }}>
							<TableRow>
								{['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
									<TableCell
										style={{
											color: 'white',
											fontWeight: '700',
											fontFamily: 'Montserrat',
										}}
										key={head}
										align={head === 'Coin' ? '' : 'right'}
									>
										{head}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody style={{ backgroundColor: '#fdfcfc' }}>
							{handleSearch().map((row) => {
								const profit = row.price_change_percentage_24h > 0;
								return (
									<TableRow
										onClick={() => history.push(`/crypto/${row.id}`)}
										style={{ cursor: 'pointer' }}
										key={row.name}
									>
										<TableCell
											component="th"
											scope="row"
											style={{
												display: 'flex',
												gap: 15,
											}}
										>
											<img
												src={row?.image}
												alt={row.name}
												height="50"
												style={{ marginBottom: 10 }}
											/>
											<div style={{ display: 'flex', flexDirection: 'column' }}>
												<span
													style={{
														fontSize: 22,
													}}
												>
													{row.name}
												</span>
												<span
													style={{
														color: 'darkgrey',
														textTransform: 'uppercase',
													}}
												>
													{row.symbol}
												</span>
											</div>
										</TableCell>
										<TableCell align="right">
											{symbol}
											{numberWithCommas(row.current_price.toFixed(2))}
										</TableCell>
										<TableCell
											align="right"
											style={{
												color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
												fontWeight: 500,
											}}
										>
											{profit && '+'}
											{row.price_change_percentage_24h.toFixed(2)}%
										</TableCell>
										<TableCell align="right">
											{symbol}{' '}
											{numberWithCommas(row.market_cap.toString().slice(0, -6))}
											M
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				)}
			</TableContainer>
		</Container>
	);
}
