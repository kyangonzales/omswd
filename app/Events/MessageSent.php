<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $time;
    public $user;
    public $sendTo;

    /**
     * Create a new event instance.
     */
    public function __construct($message, $time, $user, $sendTo)
    {
        $this->message = $message;
        $this->time = $time;
        $this->user = $user;
        $this->sendTo = $sendTo;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // return [
        //     new PrivateChannel('chat'),
        // ];
        return [
            //  new Channel('chat'),
            new Channel('chat.' . $this->sendTo),
        ];
    }

    // This is the event name that will be broadcasted
    public function broadcastAs()
    {
        return 'message.sent';
    }
}
