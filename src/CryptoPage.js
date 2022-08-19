import { LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import CryptoInfo from './CryptoInfo';
import { numberWithCommas } from './CryptoTable';

const CryptoPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState();

	const currency = 'USD';
	const symbol = '$';

	const fetchCoin = async () => {
		const { data } = await axios.get(
			`https://api.coingecko.com/api/v3/coins/${id}`
		);

		setCoin(data);
	};

	useEffect(() => {
		fetchCoin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!coin) return <LinearProgress style={{ backgroundColor: '#4cd137' }} />;

	return (
		<div style={{ display: 'flex' }}>
			<div
				style={{
					width: '30%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 25,
					borderRight: '2px solid grey',
				}}
			>
				<img
					src={coin?.image.large}
					alt={coin?.name}
					height="200"
					style={{ marginBottom: 20 }}
				/>
				<Typography
					variant="h3"
					style={{
						fontWeight: 'bold',
						marginBottom: 20,
						fontFamily: 'Montserrat',
					}}
				>
					{coin?.name}
				</Typography>
				<Typography
					variant="subtitle1"
					style={{
						width: '100%',
						fontFamily: 'Montserrat',
						padding: 25,
						paddingBottom: 15,
						paddingTop: 0,
						textAlign: 'justify',
					}}
				>
					{ReactHtmlParser(coin?.description.en.split('. ')[0])}.
				</Typography>
				<div
					style={{
						alignSelf: 'start',
						padding: 25,
						paddingTop: 10,
						width: '100%',
					}}
				>
					<span style={{ display: 'flex' }}>
						<Typography
							variant="h5"
							style={{
								fontFamily: 'Montserrat',
							}}
						>
							Current Price:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant="h5"
							style={{
								fontFamily: 'Montserrat',
							}}
						>
							{symbol}{' '}
							{numberWithCommas(
								coin?.market_data.current_price[currency.toLowerCase()]
							)}
						</Typography>
					</span>
				</div>
			</div>
			<CryptoInfo coin={coin} />
		</div>
	);
};

export default CryptoPage;
