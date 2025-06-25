import PaymentButton from "./ui/PaymentButton";

export default function PaymentComponent({numberOfSeats, price, onPaymentSuccess, payable} : {numberOfSeats:number, price:number, onPaymentSuccess: () => void, payable:boolean} ) {
    
    const SubTotal = numberOfSeats * price;
    const tax = 0; 
    const total = SubTotal + tax;
    
    return (
        <section className="bg-dark-2/50 flex flex-col p-6 rounded-lg  h-[80vh] w-full max-w-md">
            <h1 className="text-xl font-bold mb-6 text-light-1">Booking Summary</h1>
            
            <div className="flex-1 space-y-4">                
                <div className="pt-4 space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-sm font-medium text-light-1">Number of tickets:</h3>
                        <p className="text-sm">{numberOfSeats}</p>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-sm font-medium text-light-1">price per ticket:</h3>
                        <p className="text-sm">₹{price}</p>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <h2 className="text-base font-semibold text-light-1">Subtotal:</h2>
                        <h2 className="text-base font-semibold">₹{SubTotal}</h2>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-light-1">Tax:</h3>
                        <p className="text-sm">₹{tax}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold text-light-1">Total:</h1>
                        <h1 className="text-lg font-bold">₹{total}</h1>
                    </div>
                </div>
            </div>
            
            <PaymentButton disabled={!payable} onSuccess={onPaymentSuccess} priceObject={{numberOfSeats, price}} />
        </section>
    );
}