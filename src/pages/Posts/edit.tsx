/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-25 12:55:39
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { BackBtn, Editor } from "../../components/widgets/Editor";
import { message } from "react-message-popup";



export const PostEdit: BasicPage = () => {

  const [originPost, setOriginPost] = useState<any>({});
  const [post, setPost] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const postId = window.location.pathname.split('/').pop();
  useMount(() => {
     postId !== 'edit' && apiClient.get(`/posts/${postId}`).then(res => {
      setPost(res);
      setOriginPost(res);
      setLoading(false);
    })
  })

  return (
    <NxPage>
      {
        (postId !== 'edit' && !loading) && (
          <Editor
            post={post}
            submit={(data: any) => {
              apiClient.put(`/posts/${postId}`, null, null, data).then(res => {
                setPost(res);
                setOriginPost(res);
                message.success('保存成功');
              }).catch(err => {
                message.error("保存失败");
                console.log(err);
              })
            }}
          />
        ) || (
          <Editor
            post={post}
            submit={(data: any) => {
              apiClient.post(`/posts/${postId}`, null, null, data).then(res => {
                setPost(res);
                setOriginPost(res);
                message.success('发布成功');
                window.location.href = `/posts/edit/${res.id}`;
              }).catch(err => {
                message.error("发布失败");
                message.error(err.message);
                console.log(err);
              })
            }}
          />
        )
      }
    </NxPage>
  )
}