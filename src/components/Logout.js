import React,{ useEffect} from 'react'
import {Row, Col, Card } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const Logout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        (async () =>  {
            await logout()
            navigate('/login')
        })()        
    }, [])

    return (
        <>
            <Row>
                <Col md={{ span:6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Log Out</Card.Title>
                           
                            <Card.Title>Pleasae wait while you're being logged out...</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Logout 