interface Props {
  msg: string;
  type?: 'success' | 'error' | 'info';
}

const Message: React.FC<Props> = (props) => {
  const { msg, type = 'success' } = props;
  return <div>{msg}</div>;
};

export default Message;
