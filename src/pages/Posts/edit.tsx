/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 23:53:25
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import './edit.module.css';
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { useClasses } from "@geist-ui/core";
import { Editor } from "../../components/widgets/Editor";
// import CodeMirror from '@uiw/react-codemirror';
// import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
// import { javascript } from '@codemirror/lang-javascript';


export const PostEdit: BasicPage = () => {


  const [post, setPost] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const postId = window.location.pathname.split('/').pop();

  useMount(() => {
    apiClient.get(`/posts/${postId}`).then(res => {
      setPost(res);
      setLoading(false);
    })
  })

  return (
    <NxPage>
      {
        !loading && (
          <Editor
            post={post}
          />
        )
      }
    </NxPage>
  )
}