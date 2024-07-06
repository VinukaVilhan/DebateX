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
        <div className="flex bg-white h-60">
        <div className="flex gap-4 w-full">
            <div className="flex-1 bg-red-100 rounded-lg">
              {/* Content for first part */}
            </div>
            <div className="flex-1 bg-red-100 rounded-lg">
              {/* Content for second part */}
            </div>
            
          </div>
        </div>
        <div className="flex bg-white h-60 items-center justify-center">
          <Tabs defaultValue="upcoming" className="w-[400px] bg-dark-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="previous">Previous</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>
                    View your upcoming events here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {/* Add content for upcoming events */}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>View All</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="previous">
              <Card>
                <CardHeader>
                  <CardTitle>Previous</CardTitle>
                  <CardDescription>
                    View your past events here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {/* Add content for previous events */}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>View All</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex bg-white h-60 p-4">
          <div className="flex gap-4 w-full">
            <div className="flex-1 bg-red-100 rounded-lg">
              {/* Content for first part */}
            </div>
            <div className="flex-1 bg-red-100 rounded-lg">
              {/* Content for second part */}
            </div>
            <div className="flex-1 bg-red-100 rounded-lg">
              {/* Content for third part */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home