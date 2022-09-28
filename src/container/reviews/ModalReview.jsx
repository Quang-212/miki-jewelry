import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { FormProvider, TextAreaField } from 'src/components/HookForms';
import { CloseIcon, UploadImageIcon } from 'src/components/Icons';
import { DynamicRatingStar } from 'src/components/RatingStar';
import { createFeedback } from 'src/fetching/feedback';
import { userState } from 'src/recoils';

const TOTAL_STARS = 5;

const schema = yup.object().shape({
  rating: yup.number().typeError('qwerty').min(1, 'Bạn cần đánh giá trước khi gửi'),
});

export default function ModalReview({ isOpen, setIsOpen, order = {} }) {
  const [rating, setRating] = useState(0);
  const { user } = useRecoilValue(userState);
  const { product, size, _id } = order;

  const handleCloseModal = () => {
    return setIsOpen((prev) => ({ ...prev, review: false }));
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
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
    try {
      const res = await createFeedback({
        ...data,
        user: user._id,
        targetId: product._id,
        classify: size,
        productId: product._id,
        orderId: _id,
      });
      console.log(res);
    } catch (error) {
      if (405 === error.response?.status) {
        toast(error.response.data.message, { type: 'info' });
      }
    }
  };

  return (
    <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="pb-9 px-14 bg-neutral-5">
      <div className="grid grid-cols-12 gap-y-2">
        <div className="col-span-12 flex justify-end cursor-pointer">
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <strong className="col-span-12">Đánh giá sản phẩm này*</strong>
        <div className="col-span-12">
          <DynamicRatingStar
            count={TOTAL_STARS}
            rating={rating}
            onRating={(prev) => setRating(prev)}
            color={{ filled: 'text-active-star', unfilled: 'text-normal-star' }}
          />
          <span>{errors?.rating?.message}</span>
        </div>
        <strong className="col-span-6 mt-2">Bình luận</strong>
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
            type="button"
            onClick={handleCloseModal}
            title="font-bold"
            wrapper="col-span-10 justify-self-end py-2 px-12"
          >
            Bỏ qua
          </Button>
          <Button type="submit" primary wrapper="col-span-2">
            Gửi
          </Button>
        </FormProvider>
      </div>
    </Dialog>
  );
}
