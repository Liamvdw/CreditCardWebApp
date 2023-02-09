import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from 'react-bootstrap';
import '../../src/custom.css';

const AddCard = () => {
    const [selectedProvider, setSelectedProvider] = useState('None');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState({});
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cardDetails, setCardDetails] = useState([]);

    const isCardNumberValid = (event) => {
        if (event.length > 16)
            alert('You can only have a maximum of 16 digits!');
        else
            setCardNumber(event);
    }

    const isCvv = (event) => {
        if (event.length > 3)
            alert('You can only have a maximum of 3 digits!');
        else
            setCvv(event);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveCard();
    };

    const handleChange = (e) => {
        setSelectedProvider(e.target.value);
    };

    const validateEmail = (email) => {
        isEmail(email);
    };

    const isEmail = (email) => {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if (result === true) {
            setEmail({
                emailError: false,
                email: email
            });
        } else {
            setEmail({
                emailError: true
            });
        }
    };


    const resetFields = () => {
        setCardNumber('');
        setCardHolder('');
        setCvv('');
        setSelectedProvider('None');
        setExpiryDate('');
        setFullName('');
        setAddress('');
        setEmail({ emailError: false, email: '' });
        setCity('');
        setProvince('');
        setZipCode('');
    }

    useEffect(() => {
        fetch('api/creditcard/GetCards')
            .then((response) => response.json())
            .then((data) => {
                let array = [];
                data.forEach((item) => {
                    let date = new Date(item.expiryDate);
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();
                    date = month + "/" + year;
                    item.expiryDate = date;
                    array.push(item);
                });
                setCardDetails(array);
            });
    }, []);

    const saveCard = async () => {
        if (cardDetails.find(x => x.cardNumber == cardNumber))
            alert('This credit card already exists!');

        else if (selectedProvider == 'None')
            alert('Select a credit provider!');

        else if (cardNumber.length !== 16)
            alert('You can only have a maximum of 16 digits!');

        else if (cvv.length !== 3)
            alert('You can only have a maximum of 3 digits!');

        else {
            await fetch('api/creditcard/Save', {
                method: 'POST',
                body: JSON.stringify({
                    CardHolder: cardHolder,
                    CardNumber: cardNumber,
                    Cvv: cvv,
                    CardProvider: selectedProvider,
                    ExpiryDate: expiryDate,
                    FullName: fullName,
                    Address: address,
                    Email: email.email,
                    City: city,
                    Province: province,
                    ZipCode: zipCode,
                    CreatedDate: new Date(),
                    UpdatedDate: new Date()
                }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
                .then((response) => response.text.toString())
                .then((data) => {
                    alert('Saved Successfully!');
                    resetFields();

                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="row">
                <div className="row">
                    <h2 className="mb-3 text-center">Billing Address</h2>
                    <div className="col-4 mb-3">
                        <Form.Group controlId="cardHolder">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="John M Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </Form.Group>
                    </div>
                    <div className="col-4 mb-3">
                        <Form.Group controlId="cardHolder">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="johnmdoe@example.com" onChange={(e) => validateEmail(e.target.value)} required />
                            {email.emailError ? <span style={{ color: "red" }}>Please Enter valid email address</span> : ''}
                        </Form.Group>
                    </div>
                    <div className="col-4 mb-3">
                        <Form.Group controlId="cardHolder">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="10 example str, Kraaifontein" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                    </div>
                    <div className="col-4 mb-3">
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Cape Town" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </Form.Group>
                    </div>
                    <div className="col-6 mb-3">
                        <Form.Group controlId="province">
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control type="text" placeholder="Western Cape" value={province} onChange={(e) => setProvince(e.target.value)} required />
                        </Form.Group>
                    </div>
                    <div className="col-2 mb-3">
                        <Form.Group controlId="zipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="number" placeholder="5555" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                        </Form.Group>
                    </div>
                </div>

                <h2 className="mb-3 text-center">Credit Card Details</h2>
                <div className="col-4 mb-3">
                    <Form.Label>Credit Card Provider</Form.Label>
                    <Form.Select required value={selectedProvider} onChange={handleChange}>
                        <option value="None">None</option>
                        <option value="Master Card">Master Card</option>
                        <option value="Visa">Visa</option>
                        <option value="Discover">Discover</option>
                        <option value="American Express">American Express</option>
                    </Form.Select>
                </div>

                <div className="col-8 mb-3">
                    <Form.Group controlId="creditCardNo">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control className="cardNumberWidth" type="number" placeholder="XXXX XXXX XXXX XXXX" value={cardNumber} onChange={(e) => isCardNumberValid(e.target.value)} required />
                    </Form.Group>
                </div>

                <div className="col-4 mb-3">
                    <Form.Group controlId="cardHolder">
                        <Form.Label>Credit Card Holder</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
                    </Form.Group>
                </div>
                <div className="col-4 mb-3">
                    <Form.Group controlId="cvv">
                        <Form.Label>Security Code (CVV)</Form.Label>
                        <Form.Control type="number" placeholder="XXX" value={cvv} onChange={(e) => isCvv(e.target.value)} required />
                    </Form.Group>
                </div>
                <div className="col-2 mb-3">
                    <Form.Group controlId="expDate">
                        <Form.Label>Expiry Date</Form.Label>
                        <DatePicker className="form-control"
                            selected={expiryDate}
                            onChange={(date) => setExpiryDate(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                        />
                    </Form.Group>
                </div>
                <div className="col-12 mb-3 text-center">
                    <Button type="submit" variant="outline-success" size="lg">Add Card</Button>
                </div>
            </form>
        </div>
    );
}

export default AddCard;