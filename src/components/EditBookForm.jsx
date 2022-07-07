export const EditBookForm = ({
	formIsShowing,
	fieldTitle,
	setFieldTitle,
	fieldDescription,
	setFieldDescription,
	fieldNumberOfPages,
	setFieldNumberOfPages,
	fieldLanguage,
	setFieldLanguage,
	fieldImageUrl,
	setFieldImageUrl,
	fieldBuyUrl,
	setFieldBuyUrl,
	handleButtonClear,
	handleButtonSave,
	book,
}) => {
	return (
		<>
			{formIsShowing && (
				<form>
					<div className="editPanel">
						<div className="row">
							<div className="label">Title:</div>
							<input
								value={fieldTitle}
								onChange={(e) => setFieldTitle(e.target.value)}
							/>
						</div>

						<div className="row">
							<div className="label">Description:</div>
							<textarea
								value={fieldDescription}
								onChange={(e) =>
									setFieldDescription(e.target.value)
								}
							></textarea>
						</div>

						<div className="row">
							<div className="label">Number of Pages:</div>
							<input
								value={fieldNumberOfPages}
								onChange={(e) =>
									setFieldNumberOfPages(e.target.value)
								}
							/>
						</div>

						<div className="row">
							<div className="label">Language</div>
							<input
								value={fieldLanguage}
								onChange={(e) =>
									setFieldLanguage(e.target.value)
								}
							/>
						</div>

						<div className="row">
							<div className="label">Image URL</div>
							<input
								value={fieldImageUrl}
								onChange={(e) =>
									setFieldImageUrl(e.target.value)
								}
							/>
						</div>

						<div className="row">
							<div className="label">Buy URL</div>
							<input
								value={fieldBuyUrl}
								onChange={(e) => setFieldBuyUrl(e.target.value)}
							/>
						</div>

						<div className="innerButtons">
							<button onClick={(e) => handleButtonClear(e, book)}>
								Clear
							</button>
							<button onClick={(e) => handleButtonSave(e, book)}>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</>
	);
};
