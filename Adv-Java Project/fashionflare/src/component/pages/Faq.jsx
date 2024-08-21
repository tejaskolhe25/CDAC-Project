import React from 'react';
import '../../style/faq.css'; // You can style the FAQ component using this CSS file

const FAQ = () => {
    const faqs = [
        {
            question: "Do you have a brick and mortar store of FashionFlare Boutique?",
            answer: "Yes, we do. It’s located in Chandannagar, Hooghly, West-Bengal."
        },
        {
            question: "Do all Sarees come with blouse piece?",
            answer: "Most of our sarees come with blouse piece. However, there are few sarees that do not have a blouse piece. It is mentioned in the description if it has a blouse piece or not."
        },
        {
            question: "What are the dimensions of your Saree or Jewellery?",
            answer: "All dimensions of products are mentioned in the description. Please go through that before placing an order."
        },
        {
            question: "What are the Shipping Charges for Domestic and International shipping?",
            answer: "For delivery within India, shipping is complimentary and no surcharge is payable of any kind. We don’t have International Shipping facilities currently."
        },
        {
            question: "When can I expect my order? How many days does it take for delivery?",
            answer: "All Ready to Ship products are dispatched in 1-2 business days of you placing the order, or as per the delivery date specified by you at the time of placing the order. Customized products (Sarees with fall and picot addition) are dispatched in 5-6 business days. Most orders are delivered within 3-7 business days between Monday to Saturday. However, the delivery time is subject to factors beyond our control and may exceed due to unforeseen external factors."
        },
        {
            question: "How do I know whether my product has been shipped? How do I track my order?",
            answer: "Currently we deliver through DTDC only. Once dispatched, you will receive a text from DTDC on the contact number as well as on the mail-id provided during check-out with your tracking details. You can track your order 24 hours after your order has been shipped. In case you haven’t received your tracking details through text within 48 hours, please write to us on mailtoFashionFlareboutique@gmail.com or whatsapp us on 91-9820849639."
        },
        {
            question: "What if I don’t receive my product even after the Tracking ID shows ‘Delivered successfully’?",
            answer: "In case of such one-off circumstances, please whatsapp with your concern on +91-9820849639 or drop a mail on mailtoFashionFlareboutique@gmail.com. We’ll do the needful."
        },
        {
            question: "What are the Modes of Payment?",
            answer: "Our website offers you several payment options that are absolutely safe and secure. You can choose to pay with a credit or debit card, which can be a Mastercard, Maestro, Visa, using our secure payment gateway. We have Netbanking, UPI and various Wallets to pay from as well. You may also use Xoom/Western Union to directly deposit the amount in our bank account in case you are an International Customer. (However since we don’t do International shipping, you’ll have to provide us with a Domestic delivery address). If you are facing any difficulty in completing your transaction, do reach out to us!"
        },
        {
            question: "What if it shows ‘Payment Failed’ and the amount is still debited from my account?",
            answer: "It might happen under rare circumstances due to faulty servers or network issues. In such a case, please get in touch with us with your concern on +91-9820849639 or drop a mail on mailtoFashionFlareboutique@gmail.com."
        },
        {
            question: "Do you have Cash on Delivery?",
            answer: "We accept Online Payment or Bank Transfers only. We do NOT have Cash on Delivery option."
        },
        {
            question: "Can I order through Whatsapp, Instagram or Facebook?",
            answer: "No, we do not accept orders through these platforms. Your order needs to be placed through the website only."
        },
        {
            question: "Can I cancel/modify my order after having paid for it?",
            answer: "If unfortunately you have to cancel/alter an order, please do so within 1-2 hours after placing an order, by mailing us all the details at mailtoFashionFlareboutique@gmail.com. If you cancel your order before it is shipped, we will refund you the entire amount if need be. If we have already dispatched your product, no cancellations can be made."
        },
        {
            question: "Can I modify the delivery address/contact info after having placed an order?",
            answer: "In case of modifications with regards to the delivery, kindly drop us an e-mail at mailtoFashionFlareboutique@gmail.com or call us +91-9833526707 within 1-2 hours after placing an order. Once a product has been dispatched, no modifications can be made."
        },
        {
            question: "Can I purchase now but schedule my dispatch for a later date?",
            answer: "Yes, of course. Just enter your preferred date of shipping during checkout in the ‘Additional Instruction’ box and we’ll have it shipped on your chosen date of dispatch. We ship throughout the week, except on Sundays and Public holidays. It takes 3-7 business days for delivery. Please take all of this into consideration before scheduling your date."
        },
        {
            question: "Can my billing address and shipping address be different?",
            answer: "Yes, the billing and shipping address can be different. You need to fill in the address boxes correctly during checkout."
        },
    ];

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
