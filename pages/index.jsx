import { Button, useToast } from "@chakra-ui/react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPosts } from "../services/post"
import React, { useState, useCallback } from "react"
import PostList from "../components/post.list"
import PostCreate from "../components/post.create"
import PostDetail from "../components/post.detail"
import LoadingOverlay from "../components/loading.overlay"

export default function Home() {
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  // dialog create
  const [dialogCreate, setDialogCreate] = useState(false)
  const toggleDialogCreate = useCallback(() => {
    setDialogCreate(!dialogCreate)
  }, [dialogCreate])
  // dialog detail
  const [dialogDetail, setDialogDetail] = useState(false)
  const toggleDialogDetail = useCallback(() => {
    setDialogDetail(!dialogDetail)
  }, [dialogDetail])

  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => {
      return getPosts({
        _limit: 9,
        _page: pageParam,
      })
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage
    },
  })

  // create post
  const onCreateSuccess = (res) => {
    setLoading(false)
    toast({
      title: "Post created.",
      description: `User Id: ${res.userId}, Title: ${res.title}, Body: ${res.body},`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }
  const onCreateError = () => {
    setLoading(false)
    toast({
      title: "Post Not Created.",
      description: "Im sorry ur create got error",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }
  // detail post
  const [idDetail, setIdDetail] = useState(0)
  const toggleDetail = (val) => {
    toggleDialogDetail()
    setIdDetail(val)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      {loading && <LoadingOverlay isLoading={loading} />}
      <div className="tw-px-4 tw-py-4 tw-min-h-screen tw-bg-yellow-50">
        <div className="fcb">
          <div className="bold tw-text-2xl tw-text-center">List Post</div>
          <div>
            <Button
              colorScheme="blue"
              width={"full"}
              variant={"solid"}
              onClick={(state) => toggleDialogCreate(state)}
            >
              Create Post
            </Button>
          </div>
        </div>
        <br />
        {data.pages.length > 0 ? (
          <>
            <PostList
              posts={data.pages}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              toggleDetail={toggleDetail}
            />
          </>
        ) : (
          <div>data kosong</div>
        )}
      </div>
      {dialogCreate && (
        <PostCreate
          isShow={dialogCreate}
          toggleShow={toggleDialogCreate}
          onCreateSuccess={onCreateSuccess}
          onCreateError={onCreateError}
          toggleLoading={() => setLoading(true)}
        />
      )}
      {dialogDetail && (
        <PostDetail
          isShow={dialogDetail}
          toggleShow={toggleDetail}
          id={idDetail}
        />
      )}
    </>
  )
}
