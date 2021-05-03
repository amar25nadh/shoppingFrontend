import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:5000/'
    e.preventDefault();
    const orderUrl = `${API_URL}api/orders/order`;
    const orderObj = {
      // "token": localStorage.userInfo.token,
      "userId": userInfo._id,
      "amount": order.totalPrice,
      "order_id": order._id,
    }

    localStorage.setItem('oid', order._id)
    localStorage.setItem('userid', orderObj.userId)
    console.log(localStorage.oid)


    console.log(`-----------`)
    console.log(orderObj.userId)
    console.log(order.totalPrice)
    console.log(orderObj.order_id)
    console.log(`-----------`)


    axios.post(orderUrl, orderObj).then(res => {
      if (res.status = 200) {
        const { data } = res;
        const options = {
          key: "rzp_test_5RoP8e6VMb5s8b",
          name: "Amazona",
          description: "E commerce ",
          order_id: data.id,
          handler: async (response) => {
            try {
              const paymentId = response.razorpay_payment_id;
              const url = `${API_URL}api/orders/capture/${paymentId}`;
              const captureResponse = await axios.post(url, { "userId": userInfo._id, "amount": order.totalPrice, "order_id": order._id })
              console.log(captureResponse.data);
              if (captureResponse) {
                 props.history.push('/orderhistory');
               // props.history.push('/usersuccess');
                // this.props.history.push('/valid');
              }
            } catch (err) {
              console.log(err);
              // props.history.push('/fail');

            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
      else {
        props.history.push('/fail')
      }
    }).catch(err => {
      //this.setState({ 'notLoggedIn': 1 });
    })
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button" onClick={paymentHandler}

                  className="primary block" 
                  disabled={order.isPaid == true}

                >
                  Pay Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}