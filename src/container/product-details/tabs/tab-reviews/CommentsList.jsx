import ReviewItem from './ReviewItem';

export default function CommentsList({ data }) {
  return (
    <ul className="col-span-12 flex flex-col gap-9 mt-8">
      {data.map((feedback) => (
        <li key={feedback._id}>
          <ReviewItem feedback={feedback} />
        </li>
      ))}
    </ul>
  );
}
