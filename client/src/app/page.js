"use client";
import Link from "next/link";


export default function Page() {

    return (
        <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Electronics Makes Your Day
            </h1>
            <p className="mt-4 text-xl text-gray-500">
            The products are in the most advanced technology, can reflect the latest trends with more power and perfect structure.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://media.istockphoto.com/id/627127068/vector/realistic-laptop-with-keyboard-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=ceNJ0tM76LUMDciK8xzfoetFOfmyHoo9QfUeToRfgiE="
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.istockphoto.com/id/1300530070/photo/computer-tablet-with-blank-screen.jpg?s=612x612&w=0&k=20&c=PLisu1oF8-kwxsZhZ9eqwI3yxe5nA3dMMCpWuFcI9RE="
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.istockphoto.com/id/1419254023/photo/modern-smartphone.jpg?s=612x612&w=0&k=20&c=Jzg3YH-isukPJ0MDBPFaBKi9A3JiKkfley0NRlrYHV0="
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.istockphoto.com/id/1049718356/photo/headphones.jpg?s=612x612&w=0&k=20&c=bv6zXmbjZMVQStyOtVn379tj6hR262SjsP_X9gPWTuA="
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.istockphoto.com/id/1540025982/photo/wireless-stereo-earbuds-black-wireless-earphones-and-charging-case-earbuds-or-headphones-and.jpg?s=612x612&w=0&k=20&c=2daSMhA69-VwtOqMV_hg1mZF0JmFMbpVi5c595sRFMg="

                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.istockphoto.com/id/951065424/photo/smart-watch-isolated.jpg?s=612x612&w=0&k=20&c=gnopenHjgIKJIb_WcYqgxEXwEnv2-E_xaqlu-o9jbno="
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.istockphoto.com/id/502610268/photo/dslr-camera-on-a-tripod.jpg?s=612x612&w=0&k=20&c=0a-j8jE6QeA5H6DumrAi6_Jzf3rC5y9qxYcZAMzgukw="
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/products"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
        )
}