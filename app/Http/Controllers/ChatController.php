<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $time = Carbon::now()->toDateTimeString(); // Get current time using Carbon
        $user = Auth::user();
        $sender_id = Auth::id();
        $reciever_id = $request->input('id');

        // Fire the event, passing message, time, and user
        broadcast(new MessageSent($message, $time, $user, $sender_id, $reciever_id))->toOthers();

        return response()->json([
            'message' => 'Message sent!',
            'payload' => [
                'message' => $message,
                'time' => $time,
                'user' => $user,
                'sender_id' => $sender_id,
                'reciever_id' => $reciever_id
            ]
        ]);
    }
}
