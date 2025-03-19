const Background = ({children}) => {
  return (
    <div className="md:bg-[url('src/assets/svg/banana.svg'),url('src/assets/svg/strawberry.svg')] md:bg-[65%,_45%]  bg-no-repeat  bg-[right_bottom,right_center]  bg-contain min-h-screen xl:bg-[url('src/assets/svg/fruitss.svg')] bg-no-repeat bg-right bg-contain min-h-screen" >
        {children}
    </div>
  )
}

export default Background