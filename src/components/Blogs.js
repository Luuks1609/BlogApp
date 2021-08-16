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

    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
    }, [searchInput])

    return (
        <div className='blog__page'>
            <h1 className='blog__page__header'>Blogs</h1>
            {loading ? (<h1 className='loading'>Loading...</h1>) : ''}
            <div className='bloss'>
                {blogs?.articles.map(blog => (
                    <a className='blog'
                        target='_blank'
                        href={blog.url}
                        alt='Blog Link'
                        rel="noreferrer">
                        <img src={blog.image} alt={blog.source.name} />
                        <div>
                            <h3 className='sourceName'>
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}
                {blogs?.totalArticles === 0 && (
                    <h1 className='no__blogs'>
                        No blogs available 😞. Search something else to read at the greatest platform.
                    </h1>
                )}
            </div>
        </div>
    )
}

export default Blogs

// improvements
// 1) useEffect runnen nadat input stopt d.m.v een timer
// 2) gebruik maken van een custom axios hook
// 3) profile page maken met userData (react router)
// 4) open blog links op je eigen pagina (/blog/(id)) met eigen component