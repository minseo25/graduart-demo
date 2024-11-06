interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-center text-red-500 p-4">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
