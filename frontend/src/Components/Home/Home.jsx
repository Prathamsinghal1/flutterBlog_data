import React from 'react'

export default function Home() {
    return (
        <div className="w-full bg-gradient-to-r from-pink-200 to-blue-200">
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-1/2">
                    <h1 className="flex justify-center mt-10 text-purple-500 text-4xl font-bold">
                        If Flutter is your passion,
                    </h1>
                    <p className="text-center text-xl mt-2 font-semibold text-gray-500">
                        then you're at the right place.
                    </p>
                    <p className="text-center mt-4 font-medium text-gray-400">
                        You can add and watch all flutter related topics simply by Searching.
                    </p>
                    <div className="flex gap-5 items-center justify-center mt-5 ">
                        <a href="/search-blogs" className="font-medium text-xl px-5 py-1 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-300 text-white">
                            Explore Blog
                        </a>
                        <a href="/add-blog" className="font-medium text-xl px-5 py-1 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-300 text-white">
                            Add Blog
                        </a>
                    </div>
                </div>
                <div className="w-1/2 p-8">
                    <div className="mr-10 rounded-lg">
                        <img
                            src="/Images/image.png"
                            alt="Description of image"
                            className="rounded"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
