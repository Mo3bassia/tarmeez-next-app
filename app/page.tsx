import Link from "next/link";
import { Icons } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <Icons.trendingUp className="h-10 w-10" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-3xl">
              Connect and Share in the Tarmeez Community
            </h1>

            <p className="text-muted-foreground md:text-lg max-w-[42rem] leading-normal">
              Discover posts, connect with users, and join discussions in our
              growing social platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button asChild size="lg" className="gap-2">
                <Link href="/posts">
                  Explore Posts <Icons.arrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/users">Meet Our Users</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Discover What Tarmeez Has to Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="group border-border/40 hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden">
              <Link href="/posts" className="block h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icons.fileText className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Explore Posts
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-grow">
                    Discover trending topics, share your thoughts, and engage
                    with content from our community.
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icons.messageSquare className="h-4 w-4" />
                      <span>Community Discussions</span>
                    </div>
                    <Icons.arrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="group border-border/40 hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden">
              <Link href="/users" className="block h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icons.users className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Meet Our Users
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-grow">
                    Connect with creators, experts, and community members who
                    share your interests.
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icons.users className="h-4 w-4" />
                      <span>Community Network</span>
                    </div>
                    <Icons.arrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
