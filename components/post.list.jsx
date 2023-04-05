import { Button, Box } from "@chakra-ui/react"
import React from "react"

const PostList = ({posts, hasNextPage, isFetchingNextPage, fetchNextPage, toggleDetail}) => {
  return (
    <>
      <div className="grid-12 tw-gap-4">
        {posts.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((post) => (
              <div className="tw-col-span-4" key={post.id}>
                <Box
                  px={5}
                  py={4}
                  boxShadow={"md"}
                  borderRadius={"md"}
                  backgroundColor={"#fff"}
                >
                  <div className="tw-text-[17px] bold capital">
                    {post.title}
                  </div>
                  <div className="tw-text-[14px] tw-whitespace-break tw-mt-1">
                    {`${post.body}`}
                  </div>
                  <div className="tw-mt-4 grid-3 tw-gap-4">
                    <div>
                      <Button
                        colorScheme="green"
                        width={"full"}
                        variant={"solid"}
                        onClick={() => toggleDetail(post.id)}
                      >
                        Detail
                      </Button>
                    </div>
                    <div>
                      <Button
                        colorScheme="yellow"
                        color={"white"}
                        width={"full"}
                        variant={"solid"}
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button
                        colorScheme="red"
                        width={"full"}
                        variant={"solid"}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div className="tw-col-span-12 tw-text-center">
          <Button
            colorScheme="blue"
            px={10}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load more"
              : "Nothing more to load"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default PostList
