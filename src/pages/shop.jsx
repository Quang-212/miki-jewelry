// import Component1 from 'src/components/Component1';
import { toast } from 'react-toastify';
//always import from src folder
export default function shop() {
  const functionThatReturnPromise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      {/* <Component1 /> */}
      <button
        onClick={() => {
          toast.success('🦄 Wow so easy');
          // more info in https://fkhadra.github.io/react-toastify/introduction
        }}
      >
        Success toast message
      </button>
      <button
        onClick={() => {
          toast.promise(functionThatReturnPromise, {
            pending: 'Promise is pending',
            success: 'Promise resolved 👌',
            error: 'Promise rejected 🤯',
          });
          // more info in https://fkhadra.github.io/react-toastify/introduction
        }}
      >
        Promise toast message
      </button>
    </div>
  );
}
