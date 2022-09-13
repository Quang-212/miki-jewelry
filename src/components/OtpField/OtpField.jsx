import { useState } from 'react';

export default function OtpField() {
  const [otp, setOtp] = useState(Array.from({ length: 6 }).fill(''));
  console.log(otp);

  return (
    <ul className="flex justify-center items-center space-x-2">
      {otp.map((_, index) => (
        <li key={index}>
          <input
            className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl 
            spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
          />
          {index === otp.length - 1 ? null : <span className="w-2 py-0.5 bg-gray-400" />}
        </li>
      ))}
    </ul>
  );
}
