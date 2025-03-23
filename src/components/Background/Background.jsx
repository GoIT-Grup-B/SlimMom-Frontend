const Background = ({children}) => {
  return (
    <div className="md:bg-[url('src/assets/svg/banana.svg'),url('src/assets/svg/strawberry.svg'),url('src/assets/svg/green.svg')] md:bg-[65%,35%,80%]  bg-no-repeat  md:bg-[position:right_bottom,right_center,right_top] bg-contain min-h-screen xl:bg-[url('src/assets/svg/fruitss.svg')] bg-no-repeat bg-right bg-contain min-h-screen" >
        {children}
    </div>
  )
}

export default Background