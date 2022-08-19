import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
import SelectButton from './SelectButton';

const CryptoInfo = ({ coin }) => {
	const [historicData, setHistoricData] = useState();
	const [days, setDays] = useState(1);
	const currency = 'USD';
	const [flag, setflag] = useState(false);

	const fetchHistoricData = async () => {
		const { data } = await axios.get(
			`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
		);
		setflag(true);
		setHistoricData(data.prices);
	};

	console.log(coin);

	useEffect(() => {
		fetchHistoricData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days]);

	const chartDays = [
		{
			label: '24 Hours',
			value: 1,
		},
		{
			label: '30 Days',
			value: 30,
		},
		{
			label: '3 Months',
			value: 90,
		},
		{
			label: '1 Year',
			value: 365,
		},
	];

	return (
		<div
			style={{
				width: '75%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 25,
				padding: 40,
			}}
		>
			{!historicData | (flag === false) ? (
				<CircularProgress
					style={{ color: '#4cd137' }}
					size={250}
					thickness={1}
				/>
			) : (
				<>
					<Line
						data={{
							labels: historicData.map((coin) => {
								let date = new Date(coin[0]);
								let time =
									date.getHours() > 12
										? `${date.getHours() - 12}:${date.getMinutes()} PM`
										: `${date.getHours()}:${date.getMinutes()} AM`;
								return days === 1 ? time : date.toLocaleDateString();
							}),

							datasets: [
								{
									data: historicData.map((coin) => coin[1]),
									label: `Price ( Past ${days} Days ) in ${currency}`,
									borderColor: '#4cd137',
								},
							],
						}}
						options={{
							elements: {
								point: {
									radius: 1,
								},
							},
						}}
					/>
					<div
						style={{
							display: 'flex',
							marginTop: 20,
							justifyContent: 'space-around',
							width: '100%',
						}}
					>
						{chartDays.map((day) => (
							<SelectButton
								key={day.value}
								onClick={() => {
									setDays(day.value);
									setflag(false);
								}}
								selected={day.value === days}
							>
								{day.label}
							</SelectButton>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CryptoInfo;
