import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = total === 0 ? 0 : (good - bad) / total;
	const positive = total === 0 ? "0 %" : `${(good / total) * 100} %`;

	return total > 0 ? (
		<>
			<h2>Statistics</h2>
			<table>
				<tbody>
					<StatisticsLine text="Good" value={good} />
					<StatisticsLine text="Neutral" value={neutral} />
					<StatisticsLine text="Bad" value={bad} />
					<StatisticsLine text="Total" value={total} />
					<StatisticsLine text="Average" value={average} />
					<StatisticsLine text="Positive" value={positive} />
				</tbody>
			</table>
		</>
	) : (
		<p>No feedback given</p>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
		<div>
			<h1>Give feedback</h1>
			<Button onClick={handleGoodClick} text="Good" />
			<Button onClick={handleNeutralClick} text="Neutral" />
			<Button onClick={handleBadClick} text="Bad" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
