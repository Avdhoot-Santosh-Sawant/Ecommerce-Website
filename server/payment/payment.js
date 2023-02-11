import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()


const router = express.Router()

const order = (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.key_id,
			key_secret: process.env.key_secret,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}

const paymentVerify = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", 'xmFkJbwJ8hUj6EbHNTj3NPro')
			.update(sign.toString())
			.digest("hex");
		// console.log(razorpay_signature);
		// console.log(expectedSign);

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });

		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}



//API Routes
router.post('/order', order);
router.post('/paymentVerify', paymentVerify)


export default router;
