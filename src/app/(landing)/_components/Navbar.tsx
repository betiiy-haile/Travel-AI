import Link from 'next/link';


const Navbar = () => {


    return (
        <nav className='sticky top-0 z-20 bg-[#0F172A] bg-gradient-to-b'>
            <div className='flex justify-between w-[80%] mx-auto text-gray-200 lg:py-5 px-5 lg:px-16 xl:px-20 '>

                <div className='flex items-center flex-1'>
                    <Link href="/" className='text-2xl flex flex-col items-center font-bold'>
                        <div>Travel</div>
                        <div className='text-gradient text-4xl'>AI</div>
                    </Link>
                </div>
                
                <Link href="/login" className=''>
                    
                <button className='px-8 py-3 rounded-lg bg-blue-600 '>Start Now</button>
                </Link>

            </div>
        </nav>
    )

}

export default Navbar