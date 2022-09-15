import React from 'react';
import Button from 'src/components/Button';
import { Wrapper as PopperWrapper } from 'src/components/Popper';

export default function Distribution({
  attrs,
  product,
  handleClickSize,
  sizeChecked,
  isChosenSize,
  handleSubmitDistribution,
}) {
  return (
    <div className="w-fit" tabIndex="-1" {...attrs}>
      <PopperWrapper className="gap-8 pt-4 pb-6 px-8">
        <span className="text-[#707070]">Kích thước:</span>
        <ul className="flex flex-wrap gap-4">
          {product.stocks.map((stock, index) => {
            const isOutOfStock = stock.quantity === 0;
            return (
              !isOutOfStock && (
                <li key={stock._id}>
                  <Button
                    wrapper={
                      stock.quantity
                        ? index === sizeChecked
                          ? 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-primary text-neutral-5'
                          : 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary cursor-pointer'
                        : 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-neutral-3 text-neutral-5'
                    }
                    onClick={() => handleClickSize(index)}
                    disabled={isOutOfStock || isChosenSize(stock.size)}
                  >
                    {stock.size}
                  </Button>
                </li>
              )
            );
          })}
        </ul>
        <div className="flex justify-between gap-4">
          <Button text title="subtitle-1">
            Trở lại
          </Button>
          <Button primary onClick={handleSubmitDistribution}>
            Xác nhận
          </Button>
        </div>
      </PopperWrapper>
    </div>
  );
}
