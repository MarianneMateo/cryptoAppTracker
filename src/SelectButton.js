import { makeStyles } from '@material-ui/core';

const SelectButton = ({ children, selected, onClick }) => {
	const useStyles = makeStyles({
		selectbutton: {
			border: '1px solid #4cd137',
			borderRadius: 5,
			padding: 10,
			paddingLeft: 20,
			paddingRight: 20,
			fontFamily: 'Montserrat',
			cursor: 'pointer',
			backgroundColor: selected ? '#4cd137' : '',
			color: selected ? 'white' : '',
			fontWeight: selected ? 700 : 500,
			'&:hover': {
				backgroundColor: '#4cd137',
				color: 'white',
			},
			width: '22%',
		},
	});

	const classes = useStyles();

	return (
		<span onClick={onClick} className={classes.selectbutton}>
			{children}
		</span>
	);
};

export default SelectButton;
