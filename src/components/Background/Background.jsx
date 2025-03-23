const Background = ({ children }) => {
  return (
    <div className="md:bg-[url('/svg/banana.svg'),url('/svg/strawberry.svg'),url('/svg/green.svg')] md:bg-[65%,35%,80%]  md:bg-[position:right_bottom,right_center,right_top] xl:bg-[url('/svg/fruitss.svg')] bg-no-repeat bg-right bg-contain min-h-screen">
      {children}
    </div>
  );
};

export default Background;
