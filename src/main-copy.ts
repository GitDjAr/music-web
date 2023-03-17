interface MyAxiosRequestConfig {
  url?: string;
  method?: string;
  [propName: string]: any;
}

function request<T>(RqConfig: MyAxiosRequestConfig): Promise<T> {
  return Promise.resolve({} as T);
}

interface tagsT {
  code: number,
  tags: {
    id: number;
    name: string;
    type: number;
    category: number;
    hot: boolean;
  }[]
}

export function highQualityPlaylistTags(): Promise<tagsT> {
  return request<tagsT>({
    url: '/playlist/highquality/tags',
    method: 'get',
  });
}

async function test() {
  const { tags } = await highQualityPlaylistTags();
  console.log(tags);

}

test();
