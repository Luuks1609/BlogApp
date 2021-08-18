import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInput, setBlogData } from '../features/userSlice';
import '../styling/blogs.css'


const Blogs = () => {

    const searchInput = useSelector(selectUserInput)
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=5718240c66a43ecd3aeb2c395070ecf1`
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState()

    const [viewingSingleBlog, setViewingSingleBlog] = useState(false)
    const [currentSingleBlog, setCurrentSingleBlog] = useState()


    const [loading, setLoading] = useState(true)

    const blogPageHandler = (blog) => {
        setViewingSingleBlog(true)
        setCurrentSingleBlog(blog)
    }

    useEffect(() => {
        setBlogs({
            "totalArticles": 4,
            "articles": [
                {
                    "title": "Nick Leeder appointed as latest head of Google Ireland",
                    "description": "Google has announced that Nick Leeder will replace Fionnuala Meehan as the head of its Irish operation starting in April.",
                    "content": "Google has announced that Nick Leeder will replace Fionnuala Meehan as the head of its Irish operation starting in April.\nWhile its staff continue to work from home in the midst of the coronavirus pandemic, Google Ireland will have a new person leadi... [1514 chars]",
                    "url": "https://www.siliconrepublic.com/companies/nick-leeder-google-ireland",
                    "image": "https://www.siliconrepublic.com/wp-content/uploads/2020/03/BOO_3353_2.jpg",
                    "publishedAt": "2020-03-23T13:58:53Z",
                    "source": {
                        "name": "Silicon Republic",
                        "url": "https://www.siliconrepublic.com/"
                    }
                }
            ]
        })
        axios
            .get(blog_url)
            .then((res) => {
                dispatch(setBlogData(res.data))
                setBlogs(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [searchInput, blog_url, dispatch])

    return (
        <div className='blog__page'>
            <h1 className='blog__page__header'>Blogs</h1>
            {loading ? (<h1 className='loading'>Loading...</h1>) : ''}

            {!viewingSingleBlog
                ? (<div className='blogs'>
                    {blogs?.articles.map((blog, index) => (
                        <div className='blog'
                            key={index}
                            onClick={() => blogPageHandler(blog)}
                            alt='Blog Link'>
                            <img src={blog.image} alt={blog.source.name} />
                            <div>
                                <h3 className='sourceName'>
                                    <span>{blog.source.name}</span>
                                    <p>{blog.publishedAt}</p>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </div>
                    ))}

                    {blogs?.totalArticles === 0 && (
                        <h1 className='no__blogs'>
                            No blogs available 😞. Search something else to read at the greatest platform.
                        </h1>
                    )}

                </div>)
                :
                <div>
                    <button
                        className='blog__single__button'
                        onClick={() => setViewingSingleBlog(false)}>
                        Back
                    </button>

                    <div className='blog' alt='Blog Link'>
                        <img src={currentSingleBlog.image} alt={currentSingleBlog.source.name} />
                        <div>
                            <h3 className='sourceName'>
                                <span>{currentSingleBlog.source.name}</span>
                                <p>{currentSingleBlog.publishedAt}</p>
                            </h3>
                            <h1>{currentSingleBlog.title}</h1>
                            <p>{currentSingleBlog.content}</p>
                            <p>Read the full article at <a href={currentSingleBlog.url}>{currentSingleBlog.source.name}</a></p>
                        </div>
                    </div>
                </div>

            }

        </div>
    )
}

export default Blogs
