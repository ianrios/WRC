import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RSModal = (props) => {
	const {
		className,
		title,
		body,
		modal,
		toggle
	} = props;

	return (
		<Modal isOpen={modal} toggle={toggle} className={className}>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>
			<ModalBody>
				{body}
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={toggle}>close</Button>
			</ModalFooter>
		</Modal>
	);
}

export default RSModal;