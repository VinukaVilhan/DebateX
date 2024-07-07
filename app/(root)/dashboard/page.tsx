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

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex h-60">
         <div className="flex gap-4 w-full">
            <div className="flex-[3] bg-red-100 rounded-sm">
              {/* Content for first part */}
            </div>
            <div className="flex-[2] bg-red-100 rounded-lg">
              {/* Content for second part */}
              <div className="flex-1 flex flex-row items-center justify-center gap-2 p-5">
                {/* Top part with icons and text */}
                <div className="flex flex-col items-center">
                  <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/><path d="M12.29 6.71a1 1 0 00-1.41 0l-3 3a1 1 0 001.41 1.41L11 9.41V16a1 1 0 002 0V9.41l1.29 1.29a1 1 0 101.41-1.41z"/></svg>
                  <span className="text-center text-black">Icon 1</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/><path d="M12.29 6.71a1 1 0 00-1.41 0l-3 3a1 1 0 001.41 1.41L11 9.41V16a1 1 0 002 0V9.41l1.29 1.29a1 1 0 101.41-1.41z"/></svg>
                  <span className="text-center text-black">Icon 2</span>
                </div>
              </div>
              <div className="flex-2 flex items-center justify-center bg-gray-200 rounded-b-lg p-4">
                {/* Bottom part with centered content */}
                <span className="text-center text-black justify-center">Centered Content</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-60 items-center ">
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