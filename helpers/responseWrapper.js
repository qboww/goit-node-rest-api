const respond = (res, status, code, data) => {
  res.status(status).json({ status, code, data });
};

export default respond;
