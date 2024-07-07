import React from 'react'
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
      <div className="flex flex-col gap-4">
        <div className="flex h-60">
         <div className="flex gap-4 w-full">
            <div className="flex flex-[3] bg-red-100 rounded-sm">
              {/* Content for first part */}
            </div>
            <div className="flex flex-[2] bg-red-100 rounded-lg flex-col">
              {/* Content for second part */}
              <div className='flex flex-[1] bg-blue-600  last:items-center gap-5 justify-evenly'>
                
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
              <div className='flex-[1] bg-black'>
                <p>till</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-60 items-center">
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