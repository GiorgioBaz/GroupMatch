function Grade(props) {
	return (
		<div className="subject-grade">
			<select
				className="grades"
				onChange={(e) => props.onGradeChange(e, props.index)}
				value={props.grade}
			>
				<option value={"HD"}>HD</option>
				<option value={"D"}>D</option>
				<option value={"C"}>C</option>
				<option value={"P"}>P</option>
				<option value={"F"}>F</option>
			</select>
			<input
				className="profile-input"
				placeholder="Subject Name"
				value={props.subject || ""}
				onChange={(e) => props.onSubjectChange(e, props.index)}
			/>
		</div>
	);
}

export default Grade;
