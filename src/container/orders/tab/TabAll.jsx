import { NormalDivider } from 'src/components/Dividers';

export default function TabAll() {
  return (
    <section className="flex flex-col gap-4 container py-8 bg-neutral-5">
      <h5 className="heading-5 text-neutral-2">Mã đơn hàng: 167495</h5>
      <ul className="flex flex-col gap-2">
        <li>Lira Earrings</li>
        <NormalDivider />
        <li>Lira Earrings</li>
        <NormalDivider />
      </ul>
      <div></div>
    </section>
  );
}
