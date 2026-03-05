from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from app.models import TaskStatus


# ==================== User Schemas ====================

class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr


class UserCreate(UserBase):
    """User creation schema"""
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")


class UserResponse(UserBase):
    """User response schema"""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ==================== Task Schemas ====================

class TaskBase(BaseModel):
    """Base task schema"""
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: TaskStatus = TaskStatus.TODO


class TaskCreate(TaskBase):
    """Task creation schema"""
    pass


class TaskUpdate(BaseModel):
    """Task update schema"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[TaskStatus] = None


class TaskResponse(TaskBase):
    """Task response schema"""
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TaskListResponse(BaseModel):
    """Task list response schema"""
    tasks: List[TaskResponse]
    total: int


# ==================== Authentication Schemas ====================

class LoginRequest(BaseModel):
    """Login request schema"""
    email: EmailStr
    password: str


class AuthTokenResponse(BaseModel):
    """Authentication token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenData(BaseModel):
    """Token data payload"""
    sub: str  # email
    exp: datetime
