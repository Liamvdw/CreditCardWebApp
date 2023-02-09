
const CreditCardService = () => {
    const getAllCards = () => {

        try {
            const response = fetch('api/creditcard/GetCards');
            return response.json();
        } catch (error) {
            return [];
        }

    }

     const saveCreditCard = (data) => {
        fetch(`https://localhost:44439/api/CreditCard/SaveCreditCard`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: data
        }).
            then(response => response.text())
            .then(data => {
                console.log(data);
            });

    }

}


export default CreditCardService;