from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("topic", views.getTopics, name="getTopics"),
    path("getTopicBlogs/", views.getTopicBlogs, name="getTopicBlogs"),
    path("createBlog", views.createBlog, name="createBlog"),
    path("updateBlog", views.updateBlog, name="updateBlog"),
    path("deleteBlog/", views.deleteBlog, name="deleteBlog"),
    path("getBlogComments/", views.getBlogComments, name="getBlogComments"),
    path("createComment", views.createComment, name="createComment"),
    path("updateComment", views.updateComment, name="updateComment"),
    path("deleteBlog/", views.deleteBlog, name="deleteBlog"),
    path("deleteComment/", views.deleteComment, name="deleteComment"),

]
