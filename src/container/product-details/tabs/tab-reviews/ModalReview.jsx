import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { FormProvider, TextAreaField } from 'src/components/HookForms';
import { CloseIcon, UploadImageIcon } from 'src/components/Icons';
import RatingStar from 'src/components/RatingStar';

const TOTAL_STARS = 5;

const schema = yup.object().shape({
  // comment:
  rating: yup.number().typeError('qwerty').min(1, 'asdfg'),
});

export default function ModalReview({ isOpen, setIsOpen }) {
  const [rating, setRating] = useState(0);
  console.log(rating);

  const handleCloseModal = () => {
    return setIsOpen((prev) => ({ ...prev, review: false }));
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: 'hello ae',
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue('rating', rating);
  }, [rating]);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="pb-9 px-14 bg-neutral-5">
      <div className="grid grid-cols-12 gap-y-2">
        <div className="col-span-12 flex justify-end cursor-pointer">
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <strong className="col-span-12">Đánh giá sản phẩm này</strong>
        <div className="col-span-12">
          <RatingStar
            count={TOTAL_STARS}
            rating={rating}
            onRating={(prev) => setRating(prev)}
            color={{ filled: 'text-active-star', unfilled: 'text-[#E9E9E9]' }}
          />
          <span>{errors?.rating?.message}</span>
        </div>
        <strong className="col-span-6 mt-2">Bình luận*</strong>
        <small className="col-span-6 justify-self-end">Ký tự còn lại 250</small>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-12 grid grid-cols-12"
        >
          <div className="col-span-12">
            <TextAreaField name="comment" placeholder="Nhập mô tả tại đây" cols="111" rows="8" />
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <strong>Thêm hình ảnh/video sản phẩm nếu có:</strong>
            <Button leftIcon={<UploadImageIcon />}>Ảnh/Video</Button>
          </div>
          <Button
            text
            onClick={handleCloseModal}
            title="font-bold"
            wrapper="col-span-10 justify-self-end py-2 px-12"
          >
            Bỏ qua
          </Button>
          <Button primary wrapper="col-span-2">
            Gửi
          </Button>
        </FormProvider>
      </div>
    </Dialog>
  );
}
