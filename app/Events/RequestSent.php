<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class RequestSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;
    public $userIds;

    /**
     * Create a new event instance.
     */
    public function __construct($data, $userIds)
    {
        $this->data = $data;
        $this->userIds = $userIds;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // return [
        //     new PrivateChannel('request'),
        // ];
        
        // return collect($this->userIds)->map(fn($id) => new Channel("request.{$id}"))->toArray();
        return collect($this->userIds)->map(function ($id) {
            return new Channel("request." .$id);
        })->toArray();
    }

    public function broadcastAs()
    {
        return 'request.sent';
    }

    public function broadcastWith()
    {
        return [
            'data' => $this->data
        ];
    }
}
