
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageSquare, ThumbsUp, Clock, User, Filter } from "lucide-react";
import { Discussion, DiscussionReply } from "@/types/community";
import { toast } from "@/hooks/use-toast";

export function DiscussionBoard() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    description: "",
    category: "general" as const,
    tags: ""
  });
  const [authorName, setAuthorName] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  const categories = [
    { value: "general", label: "General Discussion" },
    { value: "frameworks", label: "Frameworks" },
    { value: "controls", label: "Controls" },
    { value: "mappings", label: "Mappings" },
    { value: "technical", label: "Technical Support" }
  ];

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.description || !authorName) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields including your name.",
        variant: "destructive",
      });
      return;
    }

    const discussion: Discussion = {
      id: `discussion-${Date.now()}`,
      title: newDiscussion.title,
      description: newDiscussion.description,
      author: authorName,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      status: "open",
      category: newDiscussion.category,
      tags: newDiscussion.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      replies: [],
      votes: 0
    };

    setDiscussions(prev => [discussion, ...prev]);
    setNewDiscussion({ title: "", description: "", category: "general", tags: "" });
    setAuthorName("");
    setShowNewDialog(false);

    toast({
      title: "Discussion created",
      description: "Your discussion has been posted to the community board.",
    });
  };

  const handleAddReply = () => {
    if (!newReply || !replyAuthor || !selectedDiscussion) return;

    const reply: DiscussionReply = {
      id: `reply-${Date.now()}`,
      content: newReply,
      author: replyAuthor,
      timestamp: new Date().toISOString(),
      votes: 0
    };

    setDiscussions(prev => prev.map(d => 
      d.id === selectedDiscussion.id 
        ? { ...d, replies: [...d.replies, reply], lastActivity: new Date().toISOString() }
        : d
    ));

    setNewReply("");
    setReplyAuthor("");
    
    toast({
      title: "Reply added",
      description: "Your reply has been posted.",
    });
  };

  const handleVoteDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(d => 
      d.id === discussionId ? { ...d, votes: d.votes + 1 } : d
    ));
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesFilter = filter === "all" || discussion.category === filter;
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frameworks': return 'bg-blue-100 text-blue-800';
      case 'controls': return 'bg-green-100 text-green-800';
      case 'mappings': return 'bg-purple-100 text-purple-800';
      case 'technical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Community Discussions</h2>
          <p className="text-muted-foreground">Join conversations about frameworks, controls, and security topics</p>
        </div>
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Start Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Start New Discussion</DialogTitle>
              <DialogDescription>
                Create a new discussion topic for the community
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author-name">Your Name</Label>
                <Input
                  id="author-name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discussion-title">Title</Label>
                <Input
                  id="discussion-title"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discussion-category">Category</Label>
                <Select value={newDiscussion.category} onValueChange={(value: any) => setNewDiscussion(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discussion-description">Description</Label>
                <Textarea
                  id="discussion-description"
                  value={newDiscussion.description}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your question or topic in detail"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discussion-tags">Tags (optional)</Label>
                <Input
                  id="discussion-tags"
                  value={newDiscussion.tags}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Enter tags separated by commas (e.g., nist, controls, mapping)"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDiscussion}>
                  Create Discussion
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to start a conversation in the community!
              </p>
              <Button onClick={() => setShowNewDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredDiscussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader onClick={() => setSelectedDiscussion(discussion)}>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getCategoryColor(discussion.category)}>
                        {discussion.category}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {discussion.status}
                      </Badge>
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{discussion.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{discussion.description}</CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {discussion.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDate(discussion.createdAt)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoteDiscussion(discussion.id);
                      }}
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {discussion.votes}
                    </Button>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {discussion.replies.length} replies
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      {/* Discussion Detail Dialog */}
      {selectedDiscussion && (
        <Dialog open={Boolean(selectedDiscussion)} onOpenChange={() => setSelectedDiscussion(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedDiscussion.title}</DialogTitle>
              <DialogDescription>
                Started by {selectedDiscussion.author} on {formatDate(selectedDiscussion.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="p-4 bg-accent rounded-lg">
                <p className="whitespace-pre-wrap">{selectedDiscussion.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  {selectedDiscussion.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Replies */}
              <div className="space-y-4">
                <h4 className="font-semibold">Replies ({selectedDiscussion.replies.length})</h4>
                {selectedDiscussion.replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {reply.author.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add Reply */}
                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Your name"
                        value={replyAuthor}
                        onChange={(e) => setReplyAuthor(e.target.value)}
                      />
                      <Textarea
                        placeholder="Write your reply..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddReply}
                          disabled={!newReply.trim() || !replyAuthor.trim()}
                          size="sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
