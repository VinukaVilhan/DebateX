import React from 'react'
import NavbarDashboard from '@/components/Navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const Home = () => {
  return (

    <section className="flex size-full flex-col gap-10 text-white">
      <div className="flex flex-col">
        <div className="flex h-70 flex-grow">
         <div className="flex gap-4 w-full flex-grow my-2">
            <div className="flex flex-[3] bg-red-100 rounded-sm flex-col">
              {/* Content for first part */}
              <div className='flex flex-[1] bg-black'>
              <div className='flex w-1/4 items-center justify-center p-2'>
                {/* Content for the smaller part */}
                <Image className='rounded-full'
                src='/images/avatar-1.jpeg'
                height={150}
                width={150}
                alt='profile pic'

                />
              </div>
              <div className='flex flex-col w-3/4 bg-black px-5 py-6 gap-1'>
                {/* Content for the larger part */}
                
                <h1 className='font-extrabold text-3xl'>Jamie Curtis</h1>
                <h3 className='font-light'>Jamie47@gmail.com</h3>
                <Button className='bg-purple-600 rounded-xl w-min' variant="outline">Free Plan</Button>

              </div>
              </div>
              <div className='flex flex-[1] bg-slate-900 flex-col'>
                <p className='mx-5 my-2 font-semibold'>Included in your plan</p>
                <div className='flex flex-row items-center justify-evenly p-1 m-1'>
                  <Image
                  src='/icons/chat(p).png'
                  width={30}
                  height={30}
                  alt='chat icon'
                  />

                  <Image
                  src={'/icons/notes(p).png'}
                  width={30}
                  height={30}
                  alt='notes icon'
                  />

                  <Image
                  src={'/icons/video(p).png'}
                  width={30}
                  height={30}
                  alt='video icon'
                  />


                </div>
              </div>
            </div>
            <div className="flex flex-[2] bg-red-100 rounded-lg flex-col">
              {/* Content for second part */}
              
              <div className='flex flex-[1] bg-black  last:items-center gap-5 justify-evenly'>
                
                <Image
                src='/icons/schedule.svg'
                width={30}
                height={30}
                alt='schedule meeting'
                />

                <Image
                src='/icons/add-meeting.svg'
                width={30}
                height={30}
                alt='host a meeting'
                />

                <Image
                src={'/icons/join-meeting.svg'}
                width={30}
                height={30}
                alt='join a meeting'/>

              </div>
              <div className='flex flex-[1] bg-black justify-center items-center'>
                <Card className='bg-slate-400 outline-none rounded-xl'>
                  <CardContent className='flex flex-col bg-slate-400 m-1 justify-center'>
                    <h3 className='font-semibold'>Personal meeting ID</h3>
                    <div className='flex flex-row items-center gap-2'>
                      <h3>305-206-243</h3>
                      <Image
                      src={'/icons/copy.png'}
                      width={30}
                      height={30}
                      alt='copy id icon'/>
                    </div>
                    
                  </CardContent>
              
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-60 items-center my-1">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="previous">Previous</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card className='text-center'>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>
                    View your upcoming events here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <div className="space-y-1">
                    {/* Add content for upcoming events */}
                  </div>
                </CardContent>
                <CardFooter>
                
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="previous">
              <Card className='text-center'>
                <CardHeader>
                  <CardTitle>Previous</CardTitle>
                  <CardDescription>
                    View your past events here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <div className="space-y-1">
                    {/* Add content for previous events */}
                  </div>
                </CardContent>
                <CardFooter>
                 
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      
      </div>
    </section>
  )
}

export default Home