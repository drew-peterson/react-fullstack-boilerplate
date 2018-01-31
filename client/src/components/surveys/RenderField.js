import React from 'react';

const Renderfield = ({ input, label, type, meta: { touched, error } }) => (
	<div>
		<label>{label}</label>
		<div>
			<input
				{...input}
				placeholder={label}
				type={type}
				style={{ marginBottom: '5px' }}
			/>
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	</div>
);

export default Renderfield;
