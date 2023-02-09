import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const DisplayCards = () => {
    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
        getAllCards();
    }, []);

    const getAllCards = () => {
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
    }

    const deleteCard = (cardNumber) => {
        fetch('api/creditcard/Delete/' + cardNumber, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((response) => response.text.toString())
            .then((data) => {
                alert('Deleted Successfully!');
                getAllCards();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const updateCard = (cardNumber) => {
        fetch('api/creditcard/Update/' + cardNumber, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((response) => response.text.toString())
            .then((data) => {
                alert('Updated Successfully!');
                getAllCards();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    return (

        <div className="container">
            <h3 className="p-3 text-center">List of Credit Cards</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Card Provider</th>
                        <th>Card Holder</th>
                        <th>Cvv</th>
                        <th>Expiry Date</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Province</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {cardDetails && cardDetails.map(card =>
                        <tr key={card.cardNumber}>
                            <td>{card.cardNumber}</td>
                            <td>{card.cardProvider}</td>
                            <td>{card.cardHolder}</td>
                            <td>{card.cvv}</td>
                            <td>{card.expiryDate}</td>
                            <td>{card.fullName}</td>
                            <td>{card.email}</td>
                            <td>{card.address}</td>
                            <td>{card.city}</td>
                            <td>{card.province}</td>
                            <td>{card.zipCode}</td>                               
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    );

}

export default DisplayCards