import { Button, useToast } from "@chakra-ui/react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPosts } from "../services/post"
import React, { useState, useCallback } from "react"
import PostList from "../components/post.list"
import PostCreate from "../components/post.create"
import LoadingOverlay from "../components/loading.overlay"

export default function Home() {
  const toast = useToast()
  const [modalDialog, setModalDialog] = useState(false)
  const toggleModal = useCallback(() => {
    setModalDialog(!modalDialog)
  }, [modalDialog])
  const [loading, setLoading] = useState(false)

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

  const onCreateSuccess = (res) => {
    setLoading(false)
    toast({
      title: 'Post created.',
      description: `User Id: ${res.userId}, Title: ${res.title}, Body: ${res.body},`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top'
    })
  }
  const onCreateError = (res) => {
    setLoading(false)
    toast({
      title: 'Post Not Created.',
      description: "Im sorry ur create got error",
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top'
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div className="tw-px-4 tw-py-4 tw-min-h-screen tw-bg-yellow-50">
        <div className="fcb">
          <div className="bold tw-text-2xl tw-text-center">List Post</div>
          <div>
            <Button
              colorScheme="blue"
              width={"full"}
              variant={"solid"}
              onClick={toggleModal}
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
            />
          </>
        ) : (
          <div>data kosong</div>
        )}
      </div>
      {modalDialog && (
        <PostCreate
          isShow={modalDialog}
          toggleShow={toggleModal}
          onCreateSuccess={onCreateSuccess}
          onCreateError={onCreateError}
          toggleLoading={() => setLoading(true)}
        />
      )}
      {loading && <LoadingOverlay isLoading={loading} />}
    </>
  )
}
