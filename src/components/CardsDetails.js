import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  useEffect(() => {
    compare();
  }, [id]);
  const dlt = (id) => {
    dispatch(DLT(id));
    history('/');
  };
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const send = (e) => {
    dispatch(ADD(e));
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong>: {ele.rname}
                          </p>
                          <p>
                            <strong>price</strong>: Rs {ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong>: {ele.address}
                          </p>
                          <p>
                            <strong>Total</strong>: Rs {ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: 'pointer',
                              background: '#ddd',
                              color: '#111',
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(ele)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating :</strong>
                            <span
                              style={{
                                backgroundColor: 'green',
                                color: '#fff',
                                padding: '2px 5px',
                                borderRadius: '5px',
                              }}
                            >
                              {ele.rating} ⋆{' '}
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>
                            <span> {ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove :</strong>
                            <span>
                              <li
                                className="fas fa-trash"
                                onClick={() => dlt(ele.id)}
                                style={{
                                  color: 'red',
                                  fontSize: '20px',
                                  cursor: 'pointer',
                                }}
                              ></li>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
