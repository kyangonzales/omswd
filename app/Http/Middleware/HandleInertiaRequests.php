<?php

// namespace App\Http\Middleware;

// use Illuminate\Http\Request;
// use Inertia\Middleware;
// use Tighten\Ziggy\Ziggy;

// class HandleInertiaRequests extends Middleware
// {
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    // protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    // public function version(Request $request): ?string
    // {
    //     return parent::version($request);
    // }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
//     public function share(Request $request): array
//     {
//         return [
//             ...parent::share($request),
//             'auth' => [
//                 'user' => $request->user(),
//             ],
//             'ziggy' => fn () => [
//                 ...(new Ziggy)->toArray(),
//                 'location' => $request->url(),
//             ],
            
//         ];
//     }
// }


namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\Auth;
use App\Models\Messenger;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Default shared props
        $sharedProps = [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];

        // Kunin ang total unread messages kung may naka-login na user
        if ($user) {
            $unreadMessages = Messenger::where('receiver_id', $user->id)
            ->where('is_read', false)
            ->with('sender:id,name') // Kunin ang sender info
            ->get();

        // Bilangin ang total unread messages
        $totalUnread = $unreadMessages->count();

        // I-group ang messages by sender
        $senders = $unreadMessages->groupBy('sender_id')->map(function ($messages) {
            return [
                'sender_id' => $messages->first()->sender_id,
                'sender_name' => $messages->first()->sender->name,
                'unread_count' => $messages->count(),
            ];
        })->values();

        $sharedProps['total_unread_messages'] = $totalUnread;
        $sharedProps['unread_senders'] = $senders;
        }

        return $sharedProps;
    }
}
