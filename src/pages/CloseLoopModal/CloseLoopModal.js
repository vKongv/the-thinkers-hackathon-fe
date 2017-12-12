import React from 'react';
import { Button, Header, Image, Modal, List } from 'semantic-ui-react';
import shakeHand from './assets/shake-hand.jpg';
import img from '../Loop/assets/jeannie.jpg';
import img1 from '../Loop/assets/kong.jpg';
import styles from './CloseLoopModal.css';

const mPeople = [
    {
        avatar: img,
        username: 'Helen',
        position: 'Graphic Designer',
        company: 'Linker Co.',
    },
    {
        avatar: img1,
        username: 'Christian',
        position: 'Graphic Designer',
        company: 'ABD Sdn Bhd',
    },
    {
        avatar: img,
        username: 'Helen',
        position: 'Developer',
        company: 'Linker Co.',
    },
    {
        avatar: img,
        username: 'Helen',
        position: 'Architect',
        company: 'Linker Co.',
    },
    {
        avatar: img,
        username: 'Daniel',
        position: 'HR Manager',
        company: 'Asterine Co.',
    },
    {
        avatar: img,
        username: 'Helen',
        position: 'Quality Expert',
        company: 'Linker Co.',
    },
];

export default class CloseLoopModal extends React.Component {
    constructor() {
        super();
        this.state = {
            people: mPeople,
            isModalOpen: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({
            isModalOpen: true,
        });
    }

    handleClose() {
        this.setState({
            isModalOpen: false,
        });
    }

    handlePeopleOnClick(id) {
        console.log(id);
        this.handleClose();
    }

    render() {
        const { people, isModalOpen } = this.state;
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
                open={isModalOpen}
                closeIcon
                onClose={this.handleClose}
            >
                <Modal.Header>Which job you accepted ?</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size="small" src={shakeHand} />
                    <Modal.Description>
                        <List
                            selection
                            verticalAlign="middle"
                            className={styles.scrollDesc}
                        >
                            {people.map((person, index) => (
                                <List.Item key={index} onClick={() => this.handlePeopleOnClick(index)}>
                                    <Image avatar src={person.avatar} />
                                    <List.Content>
                                        <List.Header>
                                            {person.username}
                                        </List.Header>
                                        {person.position}
                                        <br />
                                        <div className={styles.miniFont}>
                                            {person.company}
                                        </div>
                                    </List.Content>
                                </List.Item>
                            ))}
                            <br />
                        </List>
                        <Button fluid onClick={this.handleClose}>
                            None :(
                        </Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}